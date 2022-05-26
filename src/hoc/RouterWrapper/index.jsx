import React from 'react';
import { useLocation } from 'react-router-dom';


export const RoutingWrapperHOC = (Component) => {
    const location = useLocation();
    React.useEffect(() => {
        console.log(location)
    }, []);

    return <Component />;
}