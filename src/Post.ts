export interface PostModel {
    id : string;
    title: string;
    description: string;
    blogcategory: string;
    image: string;
    blogeditor: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    userDisplayName: string; 
}