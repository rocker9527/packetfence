import i18n from '@/utils/locale'
import pfFormInput from '@/components/pfFormInput'
import pfFormPassword from '@/components/pfFormPassword'
import {
  attributesFromMeta,
  validatorsFromMeta
} from './'

export const view = (form = {}, meta = {}) => {
  return [
    {
      tab: null,
      rows: [
        {
          label: 'Hostname', // i18n defer
          text: i18n.t('Server the mysql server is running on.'),
          cols: [
            {
              namespace: 'host',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'host')
            }
          ]
        },
        {
          label: 'Port', // i18n defer
          text: i18n.t('Port the mysql server is running on.'),
          cols: [
            {
              namespace: 'port',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'port')
            }
          ]
        },
        {
          label: 'Database name', // i18n defer
          text: i18n.t('Name of the mysql database used by PacketFence.'),
          cols: [
            {
              namespace: 'db',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'db')
            }
          ]
        },
        {
          label: 'User', // i18n defer
          text: i18n.t('Username of the account with access to the mysql database used by PacketFence.'),
          cols: [
            {
              namespace: 'user',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'user')
            }
          ]
        },
        {
          label: 'Password', // i18n defer
          text: i18n.t('Password for the mysql database used by PacketFence.'),
          cols: [
            {
              namespace: 'pass',
              component: pfFormPassword,
              attrs: attributesFromMeta(meta, 'pass')
            }
          ]
        }
      ]
    }
  ]
}

export const validators = (form = {}, meta = {}) => {
  return {
    host: validatorsFromMeta(meta, 'host', i18n.t('Host')),
    port: validatorsFromMeta(meta, 'port', i18n.t('Port')),
    db: validatorsFromMeta(meta, 'db', i18n.t('Database')),
    user: validatorsFromMeta(meta, 'user', i18n.t('User')),
    pass: validatorsFromMeta(meta, 'user', i18n.t('Password'))
  }
}
