import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
import { DataSource } from 'typeorm';

export async function connect({
  instanceConnectionName,
  username,
  password,
  database,
}) {
  const connector = new Connector();
  const clientOpts = await connector.getTediousOptions({
    instanceConnectionName,
    ipType: IpAddressTypes.PUBLIC,
  });
  const dataSource = new DataSource({
    type: 'mssql',
    username,
    password,
    database,
    extra: {
      server: '34.67.230.109',
      options: {
        ...clientOpts,
        port: 9999,
      },
    },
  });
  await dataSource.initialize();
  const result = await dataSource.manager.find('events');

  console.log(result);
  return {
    dataSource,
    async close() {
      await dataSource.destroy();
      connector.close();
    },
  };
}
