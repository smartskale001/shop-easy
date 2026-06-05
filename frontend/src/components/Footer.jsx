export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <p className="font-semibold text-indigo-600">ShopEasy</p>
        <p>&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-indigo-600">Privacy</a>
          <a href="#" className="hover:text-indigo-600">Terms</a>
          <a href="#" className="hover:text-indigo-600">Support</a>
        </div>
      </div>
    </footer>
  )
}
