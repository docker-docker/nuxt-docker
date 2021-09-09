import Snowflake from '../common/snowflake'

import cfg from '../config'

const idGenerator = new Snowflake(cfg.snowflake.worker_id, cfg.snowflake.datacenter_id)

export default idGenerator
