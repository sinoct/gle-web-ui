export const baseTemplate: templateType = {
  data: {
    pageSize: {
      width: 0,
      height: 0,
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
  columnX: number;
  columnY: number;
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
