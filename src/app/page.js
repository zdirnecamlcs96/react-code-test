import Link from "next/link";
import Datatable from '@/components/datatable';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return users;
}

export default async function Home() {

  const data = await getData();

  return <Datatable initialData={data} />
}
