// Footer component
export default function Footer() {
     return (
          <footer className="mt-auto">
               <div className="container mx-auto px-4 py-6">
                    <p className="text-center ">
                         © {new Date().getFullYear()} EcoFlood. All rights reserved.
                    </p>
               </div>
          </footer>
     );
}