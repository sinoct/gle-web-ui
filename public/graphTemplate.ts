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
  },
};

export interface singleGraphTemplate {
  id: number;
  size: {
    width: number;
    height: number;
  };
  data: string;
  fileName: string;
  columnX: number;
  columnY: number;
  axis: axisType;
  settings?: lineGraphSettings | barGraphSettings;
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
    cursorMove: {
      x: number;
      y: number;
    };
    graph: singleGraphTemplate[] | null;
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
