import { object, number, string, TypeOf, z } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    client: string({
      required_error: 'Client is required',
    }),
    notes: string().optional(),
    weight: number({
      required_error: 'Weight is required',
    }).min(0.1, 'Weight too short - should 0.1 kg minimum'),
    height: number({
      required_error: 'Height is required',
    }).min(0.1, 'Height too short - should 1 cm minimum'),
    pal: number({
      required_error: 'Pal is required',
    })
      .min(1.4, 'Pal too short - should 1.4')
      .max(2.2, 'Pal too big - max 2.2'),
    bmi: number({
      required_error: 'Bmi is required',
    }).min(16, 'Height too short - should 16 minimum'),
    ppm_mifflin: number({
      required_error: 'Ppm mifflin is required',
    }),
    ppm_harris: number({
      required_error: 'Ppm harris is required',
    }),
    whr: number().optional(),
    whtr: number().optional(),
    ymca: number().optional(),
    bmc: number().optional(),
    chest_breath: number().optional(),
    chest_exhaust: number().optional(),
    shoulder: number().optional(),
    shoulder_tonus: number().optional(),
    waist: number().optional(),
    hip: number().optional(),
    forearm: number().optional(),
    thigh: number().optional(),
    calf: number().optional(),
  }),
};

const params = {
  params: object({
    measurementId: string({
      required_error: 'measurementId is required',
    }),
  }),
};

export const createMeasurementSchema = object({
  ...payload,
});

export const updateMeasurementSchema = object({
  ...payload,
  ...params,
});

export const deleteMeasurementSchema = object({
  ...params,
});

export const getMeasurementSchema = object({
  ...params,
});

export type CreateMeasurementInput = TypeOf<typeof createMeasurementSchema>;
export type UpdateMeasurementInput = TypeOf<typeof updateMeasurementSchema>;
export type GetMeasurementInput = TypeOf<typeof getMeasurementSchema>;
export type DeleteMeasurementInput = TypeOf<typeof deleteMeasurementSchema>;
