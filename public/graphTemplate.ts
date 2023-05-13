export const baseTemplate = {
  data: {
    pageSize: {
      width: 0,
      height: 0,
    },
    cursorMove: {
      x: 0,
      y: 0,
    },
  },
};

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
  };
}
