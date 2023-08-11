export const baseTemplate: templateType = {
  data: {
    pageSize: {
      width: 20,
      height: 20,
    },
    cursorMove: {
      x: 0,
      y: 0,
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
  settings?: {
    line?: boolean;
    marker?: string;
    color?: string;
  };
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
