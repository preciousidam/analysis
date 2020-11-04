import { Typography } from "antd";
import Link from "next/link";
import PropTypes from 'prop-types';

import '../../styles/components.scss';

const {Title} = Typography;
export const Breadcrumb = ({pageTitle, pageIcon, links, right}) => {

    return (
        <div className="breadcrumb">
            <div className="breadLeft">
                <Title className="title" level={3}>{pageIcon} {pageTitle}</Title>
                { links.map(link => <Link href={link == 'Home'? '/':link.toLowerCase()}><a>{link}</a></Link>)}
            </div>

            {right}
        </div>
    )
}

Breadcrumb.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    pageIcon: PropTypes.element.isRequired,
    links: PropTypes.array.isRequired,
}