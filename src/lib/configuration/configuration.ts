import Configuration from "../../../config.json"

interface WebConfig {
  port: number
}

interface Config {
  web: WebConfig
}

const load = (): Config => Configuration;

export default { load }
