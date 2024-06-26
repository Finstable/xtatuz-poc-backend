export interface NestConfig {
  NODE_ENV: string | undefined;
  PORT: number;
}

export interface DatabaseConfig {
  POSTGRES_HOST: string | undefined;
  POSTGRES_PORT: number;
  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  POSTGRES_DATABASE: string | undefined;
}

export interface Config {
  nest: NestConfig;
  database: any;
}

const configuration = (): Config => {
  return {
    nest: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: Number(process.env.PORT || 3000),
    },
    database: {
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || '',
      password: process.env.POSTGRES_PASSWORD || '',
      database: process.env.POSTGRES_DATABASE || '',
      entities: ['dist/**/*.entity{.ts,.js}'],
      // migrations: ['dist/migrations/*.js'],
      synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
      logging: true,
    },
  };
};

export default configuration;
