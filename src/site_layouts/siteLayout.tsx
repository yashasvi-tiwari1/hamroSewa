import React, { ReactElement } from "react";
import Navbar from "@sewa/components/navbar";
import Footer from "@sewa//components/footer";
function SiteLayout({ children }: { children: ReactElement }) {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}

export default SiteLayout;
