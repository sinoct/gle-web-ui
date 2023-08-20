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
  settings?: {
    line?: boolean;
    marker?: string;
    color?: string;
    style?: string;
    smooth?: boolean;
    impulses?: boolean;
    deresolve?: string;
    key?: string;
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
