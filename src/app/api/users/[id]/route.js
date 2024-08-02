//src/app/api/users/[id]/route.js
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

//-------------------------------------------------------------------------------------
export async function GET(request, { params }) {
  const { id } = params;
    try {
      const result = await client.query('SELECT * FROM tbl_users WHERE id = $1', [id]);
      //return new Response(JSON.stringify({ message: "GET DATA OK"}), {
      return new Response(JSON.stringify(result.rows), {  
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
}
//-------------------------------------------------------------------------------------
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
  const res = await client.query('DELETE FROM tbl_users WHERE id = $1 RETURNING *', [id]);
  if (res.rows.length === 0) {
  return new Response(JSON.stringify({ error: 'User not found' }), {
  status: 404,
  headers: { 'Content-Type': 'application/json' },
  });
  }
  return new Response(JSON.stringify(res.rows[0]), {
  status: 200,
  headers: { 'Content-Type': 'application/json' },
  });
  } catch (error) {
  console.error(error);
  return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
  status: 500,
  headers: { 'Content-Type': 'application/json' },
  });
  }
  }