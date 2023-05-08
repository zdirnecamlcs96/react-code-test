
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(params) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  // Find the correct user based on the id
  const user = users.find(user => user.id === parseInt(params.id));

  return user;
}

export default async function Page({params}) {

  const user = await getData(params);

  // if user not found, return 404 route
  if (!user) {
    return notFound();
  }

  return (
    <div className="bg-white rounded p-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.name}</dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.username}</dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.phone}</dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Website</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.website}</dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <address className="not-italic">
                {user.address.street}<br />
                {user.address.suite}<br />
                {user.address.city}<br />
                {user.address.zipcode}<br />
              </address>
            </dd>
          </div>
        </dl>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Company</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <address className="not-italic">
                {user.company.name}<br />
                {user.company.catchPhrase}<br />
                {user.company.bs}<br />
              </address>
            </dd>
          </div>
        </dl>
      </div>
      <div className="border-t pt-6 border-gray-100 flex items-center justify-end gap-x-6 px-6">
        <Link href="/" className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-900">Back</Link>
      </div>
    </div>
  );
}