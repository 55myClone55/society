import React,{FC} from "react";
import styles from './Paginator.module.css';

type PropsType = {
    totalUsersCount:number
     pageSize:number
      currentPage:number
       onPageChanged:(pageNumber: number) => void            //(pageNumber: number) => void  /// any | null//
}
// @ts-ignore
let Paginator:FC<PropsType> =  ({ 
    totalUsersCount,
     pageSize, 
     currentPage,
      onPageChanged }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
 //@ts-ignore
      return <div>
             {pages.map((p:any) => {
                        //@ts-ignore
              return <span className={ [styles.selectedPage] } 
                                      //@ts-ignore
            onClick={(e:any) => { onPageChanged(p) }}>{p}</span>
     
 })}
          </div>
         
    
}

export default Paginator;