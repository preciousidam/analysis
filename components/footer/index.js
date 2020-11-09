import Link from 'next/link';

import '../../styles/components.scss';

export const Footer = _ => (<footer id="footer">
        <div id="footerContainer">
            <p>&#169; Copyright 2020 NAPIMS</p>
            <ul id="right-links">
                <li><Link href="policy"><a>Policy</a></Link></li>
                <li><Link href="terms"><a>Terms &amp; Conditions</a></Link></li>
            </ul>
        </div>
    </footer>);