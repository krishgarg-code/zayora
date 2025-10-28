import RangesSection from '@/_components/Ranges';
import MyNavbar from '@/_components/Navbar';
import Footer from '@/_components/Footer';
import BackButton from '@/_components/BackButton';

export default function RangesPage() {
  return (
    <>
      <MyNavbar />
      <div className="bg-[#322e2c] pt-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <BackButton fallbackUrl="/" label="Back" />
        </div>
      </div>
      <main>
        <RangesSection />
      </main>
      <Footer />
    </>
  );
}
