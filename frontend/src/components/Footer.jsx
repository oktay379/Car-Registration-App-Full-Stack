import { LuInstagram } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-1">
            <h3 className="text-lg font-semibold">Hakkımızda</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget scelerisque nulla.</p>
        </div>
        <div className="col-span-1">
            <h3 className="text-lg font-semibold">VinVin</h3>
            <ul className="mt-4">
            <li>Araç Kaydet</li>
            <li>İletişime Geç</li>
            </ul>
        </div>
        <div className="col-span-1">
            <h3 className="text-lg font-semibold">İletişim</h3>
            <p>Vadi İstanbul İstinye Universitesi</p>
            <p>+90 5376882401</p>
            <p>loremipsum@hotmail.com</p>
        </div>
        <div className="col-span-1">
            <h3 className="text-lg font-semibold">Sosyal Medya</h3>
            <ul className="mt-4 flex space-x-4">
                <li><a href="https://www.instagram.com/oktay.altunkaya/" target="_blank">Oktay Altunkaya<LuInstagram /></a></li>
                <li><a href="https://www.instagram.com/emrekalyoncu22/" target="_blank">Emre Kalyoncu<LuInstagram /></a></li>
            </ul>
        </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
    </footer>
  )
}

export default Footer