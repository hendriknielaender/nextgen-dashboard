import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const hello = trpc.useQuery(['getUser', 'client'] );
  if (!hello.data) return <div>Loading...</div>;
  return (
    <div>
      <p>{hello.data.name}</p>
    </div>
  );
};
