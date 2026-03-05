import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | undefined;

function getSql() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    _sql = neon(url);
  }
  return _sql;
}

type Sql = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Record<string, any>[]>;

export const sql: Sql = (strings, ...values) => {
  return getSql()(strings, ...values) as Promise<Record<string, any>[]>;
};
