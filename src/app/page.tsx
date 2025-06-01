import Loading from '@/components/Loading';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header showSwitch={false} />
      <Loading />
    </div>
  );
}
