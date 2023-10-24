export const baseTemplate: templateType = {
  data: {
    pageSize: {
      width: 18,
      height: 24,
    },
    cursorMove: {
      x: 2,
      y: 10,
    },
    graph: null,
    cursorMovements: null,
    key: null,
  },
};

export interface singleGraphTemplate {
  id: number;
  size: {
    width: number;
    height: number;
  };
  axis: axisType;
  dataSources: dataSourceType[];
  displayElements: displayElementType[];
}

export interface lineGraphSettings {
  type: "Line";
  line?: boolean;
  marker?: string;
  color?: string;
  style?: string;
  smooth?: boolean;
  impulses?: boolean;
  deresolve?: string;
  key?: string;
}

export interface barGraphSettings {
  type: "Bar";
  color?: string;
  width?: string;
  fill?: string;
}

export interface templateType {
  data: {
    pageSize: {
      width: number;
      height: number;
    };
    cursorMove: cursorMovementType;
    graph: singleGraphTemplate[] | null;
    cursorMovements: cursorMovementType[] | null;
    key: keyTemplate | null;
  };
}

export interface axisType {
  xAxis: {
    enabled: boolean;
    log?: boolean;
    min?: number;
    max?: number;
  };
  yAxis: {
    enabled: boolean;
    log?: boolean;
    min?: number;
    max?: number;
  };
}

export interface dataSourceType {
  fileName: string;
  data: string;
  name: string;
  columnX: number;
  columnY: number;
}

export interface displayElementType {
  settings: lineGraphSettings | barGraphSettings;
  name: string;
  id: number;
}

export interface cursorMovementType {
  x: number;
  y: number;
}

export interface keyTemplate {
  position: "tl" | "tr" | "tc" | "bl" | "br" | "bc";
  offset: cursorMovementType;
  height: number;
  nobox: boolean;
}
