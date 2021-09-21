import React,{FC} from 'react';
import svg from '../../../aseets/svg.svg';

type PropsType = {
    }

let Svg:React.FC = (props => {
    return <div style={{ backgroundColor: 'white' }}>
        <img src={svg} />
    </div>
})

export default Svg;