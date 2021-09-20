import React, { Suspense } from 'react';
import Svg from '../components/common/svg/Svg';




export function withSuspense<WCP>(WrappedComponent:React.ComponentType<WCP>){
    <Suspense fallback={<Svg />}></Suspense>


    return (props:WCP) => {
        return <Suspense fallback={<Svg />}>
            <WrappedComponent {...props} />
        </Suspense>
    }
}