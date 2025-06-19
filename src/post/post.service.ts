/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { eq } from 'drizzle-orm';
import { posts } from 'src/drizzle/schema/posts.schema';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    // return await this.db.select().from(posts);
    return await this.db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.id, 20),
      with: {
        author: {
          with: {
            usersToGroups: {
              with: {
                group: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.db
      .update(posts)
      .set({
        title: 'AAAAAAA',
      })
      .where(eq(posts.id, id));
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
