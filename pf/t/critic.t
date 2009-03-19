#!/usr/bin/perl -w

use strict;
use warnings;
use diagnostics;

use Test::Perl::Critic;
use Test::More tests => 88;

my @files = (
    '/usr/local/pf/addons/autodiscover.pl',
    '/usr/local/pf/addons/convertToPortSecurity.pl',
    '/usr/local/pf/addons/monitorpfsetvlan.pl',
    '/usr/local/pf/addons/recovery.pl',
    '/usr/local/pf/addons/802.1X/pfcmd_ap.pl',
    #'/usr/local/pf/addons/802.1X/rlm_perl_packetfence.pl',
    '/usr/local/pf/addons/mrtg/mrtg-wrapper.pl',
    '/usr/local/pf/bin/accounting.pl',
    '/usr/local/pf/bin/flip.pl',
    #'/usr/local/pf/bin/pfcmd',
    '/usr/local/pf/bin/pfcmd_vlan',
    #'/usr/local/pf/lib/pf/action.pm',
    '/usr/local/pf/lib/pf/class.pm',
    '/usr/local/pf/lib/pf/configfile.pm',
    '/usr/local/pf/lib/pf/config.pm',
    '/usr/local/pf/lib/pf/db.pm',
    '/usr/local/pf/lib/pf/ifoctetslog.pm',
    '/usr/local/pf/lib/pf/iplog.pm',
    '/usr/local/pf/lib/pf/iptables.pm',
    '/usr/local/pf/lib/pf/locationlog.pm',
    '/usr/local/pf/lib/pf/nodecache.pm',
    '/usr/local/pf/lib/pf/nodecategory.pm',
    '/usr/local/pf/lib/pf/node.pm',
    '/usr/local/pf/lib/pf/os.pm',
    '/usr/local/pf/lib/pf/person.pm',
    '/usr/local/pf/lib/pf/pfcmd/dashboard.pm',
    #'/usr/local/pf/lib/pf/pfcmd/graph.pm',
    '/usr/local/pf/lib/pf/pfcmd/help.pm',
    '/usr/local/pf/lib/pf/pfcmd/pfcmd.pm',
    '/usr/local/pf/lib/pf/pfcmd.pm',
    '/usr/local/pf/lib/pf/pfcmd/report.pm',
    #'/usr/local/pf/lib/pf/pfcmd/schedule.pm',
    '/usr/local/pf/lib/pf/rawip.pm',
    '/usr/local/pf/lib/pf/services.pm',
    '/usr/local/pf/lib/pf/SNMP/Accton/ES3526XA.pm',
    '/usr/local/pf/lib/pf/SNMP/Accton/ES3528M.pm',
    '/usr/local/pf/lib/pf/SNMP/Accton.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Aironet_1130.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Aironet_1242.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Aironet_1250.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Aironet.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Catalyst_2900XL.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Catalyst_2950.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Catalyst_2960.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Catalyst_2970.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Catalyst_3500XL.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Catalyst_3550.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Catalyst_3560.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/Controller_4400_4_2_130.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco.pm',
    '/usr/local/pf/lib/pf/SNMP/Cisco/WLC_2106.pm',
    '/usr/local/pf/lib/pf/SNMP/Dell.pm',
    '/usr/local/pf/lib/pf/SNMP/Dell/PowerConnect3424.pm',
    '/usr/local/pf/lib/pf/SNMP/Dlink/DES_3526.pm',
    '/usr/local/pf/lib/pf/SNMP/Dlink.pm',
    '/usr/local/pf/lib/pf/SNMP/Enterasys.pm',
    '/usr/local/pf/lib/pf/SNMP/Enterasys/SecureStack_C2.pm',
    '/usr/local/pf/lib/pf/SNMP/HP.pm',
    '/usr/local/pf/lib/pf/SNMP/HP/Procurve_2500.pm',
    '/usr/local/pf/lib/pf/SNMP/HP/Procurve_2600.pm',
    '/usr/local/pf/lib/pf/SNMP/HP/Procurve_4100.pm',
    '/usr/local/pf/lib/pf/SNMP/Intel/Express_460.pm',
    '/usr/local/pf/lib/pf/SNMP/Intel/Express_530.pm',
    '/usr/local/pf/lib/pf/SNMP/Intel.pm',
    '/usr/local/pf/lib/pf/SNMP/Linksys.pm',
    '/usr/local/pf/lib/pf/SNMP/Linksys/SRW224G4.pm',
    '/usr/local/pf/lib/pf/SNMP/Nortel/BayStack4550.pm',
    '/usr/local/pf/lib/pf/SNMP/Nortel/BayStack470.pm',
    '/usr/local/pf/lib/pf/SNMP/Nortel/BayStack5520.pm',
    '/usr/local/pf/lib/pf/SNMP/Nortel/BayStack5520Stacked.pm',
    '/usr/local/pf/lib/pf/SNMP/Nortel/BPS2000.pm',
    '/usr/local/pf/lib/pf/SNMP/Nortel/ES325.pm',
    '/usr/local/pf/lib/pf/SNMP/Nortel.pm',
    '/usr/local/pf/lib/pf/SNMP/PacketFence.pm',
    '/usr/local/pf/lib/pf/SNMP.pm',
    '/usr/local/pf/lib/pf/SNMP/SMC.pm',
    '/usr/local/pf/lib/pf/SNMP/SMC/TS6224M.pm',
    '/usr/local/pf/lib/pf/SNMP/ThreeCom/NJ220.pm',
    '/usr/local/pf/lib/pf/SNMP/ThreeCom.pm',
    '/usr/local/pf/lib/pf/SNMP/ThreeCom/SS4200.pm',
    '/usr/local/pf/lib/pf/SNMP/ThreeCom/SS4500.pm',
    '/usr/local/pf/lib/pf/SwitchFactory.pm',
    '/usr/local/pf/lib/pf/switchlocation.pm',
    '/usr/local/pf/lib/pf/traplog.pm',
    #'/usr/local/pf/lib/pf/trigger.pm',
    '/usr/local/pf/lib/pf/util.pm',
    '/usr/local/pf/lib/pf/violation.pm',
    '/usr/local/pf/lib/pf/vlan/custom.pm',
    '/usr/local/pf/lib/pf/vlan.pm',
    #'/usr/local/pf/lib/pf/web.pm',
    '/usr/local/pf/sbin/pfdetect',
    #'/usr/local/pf/sbin/pfdhcplistener',
    '/usr/local/pf/sbin/pfmon',
    '/usr/local/pf/sbin/pfredirect',
    '/usr/local/pf/sbin/pfsetvlan',
    '/usr/local/pf/test/connect_and_read.pl',
    #'/usr/local/pf/test/dhcp_dumper'
);

foreach my $currentFile (@files) {
    critic_ok($currentFile);
}
