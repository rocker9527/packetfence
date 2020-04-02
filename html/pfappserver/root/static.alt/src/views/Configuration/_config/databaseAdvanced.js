import i18n from '@/utils/locale'
import pfFormChosen from '@/components/pfFormChosen'
import pfFormInput from '@/components/pfFormInput'
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
          label: 'Key buffer size', // i18n defer
          text: i18n.t('The key_buffer_size MySQL configuration attribute (in MB). Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'key_buffer_size',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'key_buffer_size')
            }
          ]
        },
        {
          label: 'InnoDB buffer pool size', // i18n defer
          text: i18n.t('The innodb_buffer_pool_size MySQL configuration attribute (in MB). Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'innodb_buffer_pool_size',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'innodb_buffer_pool_size')
            }
          ]
        },
        {
          label: 'InnoDB additionnal mem pool size', // i18n defer
          text: i18n.t('The innodb_additional_mem_pool_size MySQL configuration attribute (in MB). Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'innodb_additional_mem_pool_size',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'innodb_additional_mem_pool_size')
            }
          ]
        },
        {
          label: 'Query cache size', // i18n defer
          text: i18n.t('The query_cache_size MySQL configuration attribute. Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'query_cache_size',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'query_cache_size')
            }
          ]
        },
        {
          label: 'Thread concurrency', // i18n defer
          text: i18n.t('The thread_concurrency MySQL configuration attribute. Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'thread_concurrency',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'thread_concurrency')
            }
          ]
        },
        {
          label: 'Max connections', // i18n defer
          text: i18n.t('The max_connections MySQL configuration attribute. Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'max_connections',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'max_connections')
            }
          ]
        },
        {
          label: 'Table cache', // i18n defer
          text: i18n.t('The table_cache MySQL configuration attribute. Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'table_cache',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'table_cache')
            }
          ]
        },
        {
          label: 'Thread cache size', // i18n defer
          text: i18n.t('The thread_cache_size MySQL configuration attribute. Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'thread_cache_size',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'thread_cache_size')
            }
          ]
        },
        {
          label: 'Max allowed packets', // i18n defer
          text: i18n.t('The max_allowed_packet MySQL configuration attribute (in MB). Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'max_allowed_packet',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'max_allowed_packet')
            }
          ]
        },
        {
          label: 'Performance schema', // i18n defer
          text: i18n.t('The performance_schema MySQL configuration attribute. Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'performance_schema',
              component: pfFormChosen,
              attrs: attributesFromMeta(meta, 'performance_schema')
            }
          ]
        },
        {
          label: 'Max connect errors', // i18n defer
          text: i18n.t('The max_connect_errors MySQL configuration attribute. Only change if you know what you are doing. Will only affect a locally running MySQL server.'),
          cols: [
            {
              namespace: 'max_connect_errors',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'max_connect_errors')
            }
          ]
        },
        {
          label: 'Master/Slave mode', // i18n defer
          text: i18n.t('Enable master/slave replication.'),
          cols: [
            {
              namespace: 'masterslave',
              component: pfFormChosen,
              attrs: attributesFromMeta(meta, 'masterslave')
            }
          ]
        },
        {
          label: 'Other MySQL Servers', // i18n defer
          text: i18n.t('Comma delimited IPv4 address of other member MySQL members - used to sync the database.'),
          cols: [
            {
              namespace: 'other_members',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'other_members')
            }
          ]
        }
      ]
    }
  ]
}

export const validators = (form = {}, meta = {}) => {
  return {
    key_buffer_size: validatorsFromMeta(meta, 'key_buffer_size', i18n.t('Size')),
    innodb_buffer_pool_size: validatorsFromMeta(meta, 'innodb_buffer_pool_size', i18n.t('Size')),
    innodb_additional_mem_pool_size: validatorsFromMeta(meta, 'innodb_additional_mem_pool_size', i18n.t('Size')),
    query_cache_size: validatorsFromMeta(meta, 'query_cache_size', i18n.t('Size')),
    thread_concurrency: validatorsFromMeta(meta, 'thread_concurrency', i18n.t('Concurrency')),
    max_connections: validatorsFromMeta(meta, 'max_connections', i18n.t('Connections')),
    table_cache: validatorsFromMeta(meta, 'table_cache', i18n.t('Cache')),
    thread_cache_size: validatorsFromMeta(meta, 'thread_cache_size', i18n.t('Size')),
    max_allowed_packet: validatorsFromMeta(meta, 'max_allowed_packet', i18n.t('Packets')),
    performance_schema: validatorsFromMeta(meta, 'performance_schema', i18n.t('Schema')),
    max_connect_errors: validatorsFromMeta(meta, 'max_connect_errors', i18n.t('Errors')),
    masterslave: validatorsFromMeta(meta, 'masterslave', i18n.t('Mode')),
    other_members: validatorsFromMeta(meta, 'other_members', 'Other MySQL Servers')
  }
}
