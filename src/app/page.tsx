import Header from '@/components/Header';
import Main from '@/components/Main';

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <p className='mx-auto text-center mb-2 text-xs text-gray-500'>
        Photo by <a href='https://unsplash.com/@betagamma?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Daniil Silantev</a> on <a href='https://unsplash.com/photos/mountains-are-silhouetted-against-a-vibrant-sunrise-6VhIHgqo5qI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Unsplash</a>
      </p>
    </>
  );
}
