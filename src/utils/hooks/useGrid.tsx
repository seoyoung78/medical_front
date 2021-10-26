import {
  LUXDataGrid2,
  LUXDataProvider,
  LUXGridView
} from "@luna-grid/luxdatagrid2-base/dist";
import React, { forwardRef, useCallback, useRef } from "react";
import { DataFieldObject } from "realgrid";

export interface GridInst {
  grid: LUXDataGrid2;
  view: LUXGridView;
  provider: LUXDataProvider;
}

interface GridProps {
  gridSetting: {
    name: string;
    fields: DataFieldObject[];
    columns: any; //ConfigObject[];
  };
}

/**
 * grid 만드는 hook
 * @return {ref, function} grid ref, grid handler 함수
 */
const useGrid = () => {
  const gridRef = useRef<LUXDataGrid2>(null);

  //function 을 인자로 받아, function 실행
  //useCallback : 한번 만든 함수 재사용
  const handler = useCallback((callback: (grids: GridInst) => void) => {
    gridRef.current &&
      callback({
        grid: gridRef.current,
        view: gridRef.current.gridView,
        provider: gridRef.current.dataProvider
      });
  }, []);

  return { gridRef, handler };
};

const Grid = forwardRef(
  (props: GridProps, ref: React.LegacyRef<LUXDataGrid2>) => {
    return (
      <div className="grid" style={{ height: "100%", width: "100%" }}>
        <LUXDataGrid2 ref={ref} gridSetting={props.gridSetting} />
      </div>
    );
  }
);

export { Grid, useGrid };