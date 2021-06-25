import mongoose from 'mongoose';

import databaseConfig from '@config/database.config';

mongoose
  .connect(databaseConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database is listening');
  })
  .catch(err => {
    console.error(err);
  });
