require('dotenv').config();
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>(process.env.POSTGRES_PORT)),
    username: process.env.POSTGRES_USER,
    password: <string>process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;