/**
 * Get base64 certs from all environment variables starting with TRUSTSTORE_
 * @param {NodeJS.ProcessEnv} envs
 * @returns {string[]}
 */
const getTrustStoreCerts = (envs) =>
  Object.entries(envs)
    .map(([key, value]) => key.startsWith('TRUSTSTORE_') && value)
    .filter(
      /** @returns {envValue is string} */
      (envValue) => Boolean(envValue)
    )
    .map((envValue) => Buffer.from(envValue, 'base64').toString().trim())

export { getTrustStoreCerts }
