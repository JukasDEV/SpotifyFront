"use client"
import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
  } from "docx";
import { Education, Experience } from './resume-data'


  
  
  export class DocumentCreator {

    public async createAsBlob(contents: any): Promise<Blob> {
      const document = this.create(contents); 
      const blob = await Packer.toBlob(document); 
      return blob;
  }

    
    // tslint:disable-next-line: typedef
    //@ts-ignore
    public create([profile, experiences, educations, skills, achivements]): Document{
      const document = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: profile.name,
                heading: HeadingLevel.TITLE
              }),
              this.createContactInfo(profile.location, profile.phone, profile.linkedin, profile.email),
              this.createHeading("Educação"),
              ...(educations ? educations.map((education: Education) => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                      education.schoolName,
                      `${education.startDate.year} - ${education.endDate.year}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `${education.fieldOfStudy} - ${education.degree}`
                    )
                  );
  
                  const bulletPoints = this.splitParagraphIntoBullets(
                    education.notes
                  );
                  bulletPoints.forEach(bulletPoint => {
                    arr.push(this.createBullet(bulletPoint));
                  });
  
                  return arr;
                })
                .reduce((prev: any, curr: any) => prev.concat(curr), []) : []),
              this.createHeading("Experiencia"),
              ...(experiences ?
                experiences.map((position: Experience) => {
                  const arr: Paragraph[] = [];
  
                  arr.push(
                    this.createInstitutionHeader(
                      position.company.name,
                      this.createPositionDateText(
                        position.startDate,
                        position.endDate,
                        position.isCurrent
                      )
                    )
                  );
                  arr.push(this.createRoleText(position.title));
  
                  const bulletPoints = this.splitParagraphIntoBullets(
                    position.summary
                  );
  
                  bulletPoints.forEach(bulletPoint => {
                    arr.push(this.createBullet(bulletPoint));
                  });
  
                  return arr;
                })
                .reduce((prev: any, curr: any) => prev.concat(curr), []) : []),
              this.createHeading("Habilidades, Conquistas e Interesses"),
              this.createSubHeading("Hábilidades"),
              this.createSkillList(skills),
              this.createSubHeading("Conquistas"),
              ...this.createAchivementsList(achivements),
              // this.createSubHeading("Interests"),
              // this.createInterests(
              //   "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
              // ),
              // this.createHeading("References"),
              // new Paragraph(
              //   "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
              // ),
              // new Paragraph("More references upon request"),
              // new Paragraph({
              //   text:
              //     "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
              //   alignment: AlignmentType.CENTER
              // })
            ]
          }
        ]
      });
  
      return document;
    }
  
    public createContactInfo(
      location: string,
      phoneNumber: string,
      profileUrl: string,
      email: string
    ): Paragraph {
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_6,
        children: [
          new TextRun(
            `Telefone: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
          ),
          new TextRun({
            text: location,
            break: 1
          })
        ]
      });
    }
  
    public createHeading(text: string): Paragraph {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true
      });
    }
  
    public createSubHeading(text: string): Paragraph {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2
      });
    }
  
    public createInstitutionHeader(
      institutionName: string,
      dateText: string
    ): Paragraph {
      return new Paragraph({
        heading: HeadingLevel.HEADING_3,
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX
          }
        ],
        children: [
          new TextRun({
            text: institutionName,
            bold: true
          }),
          new TextRun({
            text: `\t${dateText}`,
            bold: true
          })
        ]
      });
    }
  
    public createRoleText(roleText: string): Paragraph {
      return new Paragraph({
        children: [
          new TextRun({
            text: roleText,
            italics: true
          })
        ]
      });
    }
  
    public createBullet(text: string): Paragraph {
      return new Paragraph({
        text: text,
        bullet: {
          level: 0
        }
      });
    }
  
    // tslint:disable-next-line:no-any
    public createSkillList(skills: any[]): Paragraph {
      return new Paragraph({
        children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
      });
    }
  
    // tslint:disable-next-line:no-any
    public createAchivementsList(achivements: any[]): Paragraph[] {
      return achivements.map(
        achievement =>
          new Paragraph({
            text: achievement.name,
            bullet: {
              level: 0
            }
          })
      );
    }
  
    public createInterests(interests: string): Paragraph {
      return new Paragraph({
        children: [new TextRun(interests)]
      });
    }
  
    public splitParagraphIntoBullets(text: string): string[] {
      return text.replace(/-/g, '').split("\n");
    }
  
    // tslint:disable-next-line:no-any
    public createPositionDateText(
      startDate: any,
      endDate: any,
      isCurrent: boolean
    ): string {
      const startDateText =
        this.getMonthFromInt(startDate.month) + ". " + startDate.year;
      const endDateText = isCurrent
        ? "Present"
        : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;
  
      return `${startDateText} - ${endDateText}`;
    }
  
    public getMonthFromInt(value: number): string {
      switch (value) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sept";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
        default:
          return "N/A";
      }
    }
  }
  