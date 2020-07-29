package wgorchestrator

import (
	"context"
	"encoding/base64"
	"encoding/binary"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	httpexpect "github.com/gavv/httpexpect/v2"
	"github.com/inverse-inc/packetfence/go/sharedutils"
)

var handler WgorchestratorHandler
var testServer *httptest.Server

func init() {
	var err error
	handler, err = buildWgorchestratorHandler(context.Background())
	sharedutils.CheckError(err)
	testServer = httptest.NewServer(handler.router)
}

func TestHandleGetProfile(t *testing.T) {
	e := httpexpect.New(t, testServer.URL)

	priv, err := GeneratePrivateKey()
	sharedutils.CheckError(err)
	pub, err := GeneratePublicKey(priv)
	sharedutils.CheckError(err)

	m := e.GET("/api/v1/remote_clients/server_challenge").WithQuery("public_key", base64.URLEncoding.EncodeToString(pub[:])).
		Expect().
		Status(http.StatusOK).
		JSON().
		Object().
		ContainsKey("challenge").
		ContainsKey("public_key").
		Raw()

	encryptedChallenge, err := base64.URLEncoding.DecodeString(m["challenge"].(string))
	sharedutils.CheckError(err)

	serverPublicKey, err := b64KeyToBytes(m["public_key"].(string))
	sharedutils.CheckError(err)

	sharedSecret := SharedSecret(priv, serverPublicKey)

	challenge, err := DecryptMessage(sharedSecret[:], []byte(encryptedChallenge))
	sharedutils.CheckError(err)

	challengeInt := int64(binary.LittleEndian.Uint64(challenge[AUTH_TIMESTAMP_START:AUTH_TIMESTAMP_END]))

	challengeTime := time.Unix(challengeInt, 0)

	if challengeTime.IsZero() {
		t.Error("Challenge time is the 0 value")
	}

	if challengeTime.After(time.Now()) {
		t.Error("Challenge time is after now")
	}

	if challengeTime.Before(time.Now().Add(-5 * time.Second)) {
		t.Error("Challenge time is older than 5 seconds")
	}

	challenge = append(challenge, pub[:]...)

	encryptedChallengeRaw, err := EncryptMessage(sharedSecret[:], challenge)
	sharedutils.CheckError(err)

	e.GET("/api/v1/remote_clients/profile").
		WithQuery("auth", base64.URLEncoding.EncodeToString(encryptedChallengeRaw)).
		WithQuery("public_key", base64.URLEncoding.EncodeToString(pub[:])).
		Expect().
		Status(http.StatusOK)
}
