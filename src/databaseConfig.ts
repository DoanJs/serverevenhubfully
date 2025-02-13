import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
import { Connection } from 'tedious';

export const configDB = async () => {
  const connector = new Connector();
  const clientOpts = await connector.getTediousOptions({
    instanceConnectionName: 'evenhubfully-450304:us-central1:evenhubfully',
    ipType: IpAddressTypes.PUBLIC,
  });
  const connection = new Connection({
    // Please note that the `server` property here is not used and is only defined
    // due to a bug in the tedious driver (ref: https://github.com/tediousjs/tedious/issues/1541)
    // With that in mind, do not try to change this value since it will have no
    // impact in how the connector works, this README will be updated to remove
    // this property declaration as soon as the tedious driver bug is fixed
    server: '34.67.230.109',
    authentication: {
      type: 'default',
      options: {
        userName: 'sqlserver',
        password: 'evenhubfully123456',
      },
    },
    options: {
      ...clientOpts,
      // Please note that the `port` property here is not used and is only defined
      // due to a bug in the tedious driver (ref: https://github.com/tediousjs/tedious/issues/1541)
      // With that in mind, do not try to change this value since it will have no
      // impact in how the connector works, this README will be updated to remove
      // this property declaration as soon as the tedious driver bug is fixed
      port: 9999,
      database: 'evenhubDB',
    },
  });

  connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('ok');
    // let result;
    // const req = new Request('SELECT GETUTCDATE()', (err) => {
    //   if (err) {
    //     throw err;
    //   }
    // });
    // req.on('error', (err) => {
    //   throw err;
    // });
    // req.on('row', (columns) => {
    //   result = columns;
    // });
    // req.on('requestCompleted', () => {
    //   console.table(result);
    // });
    // connection.execSql(req);
  });
};
