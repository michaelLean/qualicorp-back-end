const securityConfig = {
  salt: process.env.SALT || 8,
  secret: process.env.SECRET || 'db05c96a942efa6dd96d8efcced70e28',
};

export default securityConfig;
