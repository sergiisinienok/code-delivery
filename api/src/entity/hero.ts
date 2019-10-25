import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsInt, Min, Max, IsUrl } from 'class-validator';

@Entity()
export class Hero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(3, 80)
    name: string;

    @Column({
        length: 100
    })
    @Length(10, 100)
    alterEgo: string;
// Favorite color 1
    @Length(3, 20)
    favoriteColor: string;
// ===========
    @Column({
        default: 0
    })
    @IsInt()
    @Min(0)
    @Max(1000)
    likes: number;

    @Column({
        default: false
    })
    default: boolean;

    @Column({
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_KL8OOftRUpPHj4lDJct_VG_6fj0eW8u6iZjFlxDK_blpkROj&s'
    })
    @IsUrl()
    avatarUrl: string;

    @Column({
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_KL8OOftRUpPHj4lDJct_VG_6fj0eW8u6iZjFlxDK_blpkROj&s'
    })
    @IsUrl()
    avatarBlurredUrl: string;

    @Column({
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_KL8OOftRUpPHj4lDJct_VG_6fj0eW8u6iZjFlxDK_blpkROj&s'
    })
    @IsUrl()
    avatarThumbnailUrl: string;
}

export const heroSchema = {
    id: { type: 'number', required: true, example: 1 },
    name: { type: 'string', required: true, example: 'Javier' },
    alterEgo: { type: 'string', required: true, example: 'Bruce Banner' },
    favoriteColor: { type: 'string', required: true, example: 'white' }, // Favorite color 1
    likes: { type: 'number', required: false, example: '100' },
    default: { type: 'boolean', required: true, example: false },
    avatarUrl: { type: 'string', required: true, example: 'https://firebasestorage.googleapis.com/v0/b/ismaestro-angularexampleapp.appspot.com/o/heroes-images%2FVajTPSd8NLy2bxGXydY4.jpg?alt=media&token=6d8ab120-fd53-4af0-9069-1c97390f26bf' },
    avatarBlurredUrl: { type: 'string', required: false, example: 'https://firebasestorage.googleapis.com/v0/b/ismaestro-angularexampleapp.appspot.com/o/heroes-images%2FVajTPSd8NLy2bxGXydY4-blurred.jpg?alt=media&token=164772f4-eaee-4560-a398-347a13554b3e' },
    avatarThumbnailUrl: { type: 'string', required: false, example: 'https://firebasestorage.googleapis.com/v0/b/ismaestro-angularexampleapp.appspot.com/o/heroes-images%2FVajTPSd8NLy2bxGXydY4-thumbnail.jpg?alt=media&token=cec325f7-0e90-4565-b6d4-754cf58614fb' }
};