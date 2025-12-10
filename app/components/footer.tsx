import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="font-bold text-lg">Estate Hub</div>
          <div className="text-sm text-gray-400 mt-2">Premium real estate in Lagos, Nigeria.</div>
        </div>
        <div>
          <div className="font-semibold mb-3">Quick Links</div>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <a href="#properties">Properties</a>
            <a href="#market">Market</a>
            <a href="#agents">Agents</a>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact</div>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <div>+234 (0) 123 456 7890</div>
            <div>hello@estatehub.ng</div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Follow</div>
          <div className="flex gap-3">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"><SiFacebook className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"><SiX className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"><SiInstagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">© 2025 Estate Hub — Crafted with passion by Blue Circle</div>
    </footer>
  );
}