export type Experience = {
    isCurrent: boolean;
    summary: string;
    title: string;
    startDate: {
      month: number;
      year: number;
    };
    endDate?: {
      month: number;
      year: number;
    };
    company: {
      name: string;
    };
};
  
export type Education = {
    degree: string;
    fieldOfStudy: string;
    notes: string;
    schoolName: string;
    startDate: {
      year: number;
    };
    endDate: {
      year: number;
    };
};
  
export type Skill = {
name: string;
};
  
export type Achievement = {
issuer: string;
name: string;
};

export const experiences: Array<Experience> = []
  
export const education: Array<Education> = []
  
export const skills: Array<Skill> = []

export const achievements: Array<Achievement> = []