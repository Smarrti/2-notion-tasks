import { Client } from '@notionhq/client';
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import env from '../../env';
import debug from 'debug';
import dayjs from 'dayjs'

const ll = debug('notionbot::notionConnector');

const notion = new Client({
    auth: env!.NOTION_TOKEN,
});

const taskDB = env!.NOTION_TASK_DB;

export default {
    createTask: function (title: string, tgAuthor: string): Promise<CreatePageResponse> {
        ll('creating task', title, 'from', tgAuthor);
        return notion.pages.create({
            parent: {
                database_id: taskDB
            },
            properties: {
                Name: {
                    type: "title",
                    title: [
                        {
                            type: "text",
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                NextDate: {
                    type: "date",
                    date: {
                        start: dayjs().format('YYYY-MM-DD')
                    }
                },
                "Тип": {
                    "multi_select": [{
                          name: "Telegram"
                        },
                    ],
                },
                "Статус": {
                    select: {
                        name: 'в работе'
                    }
                },
            }

        });
    },
    convertTaskToUrl: function (task: CreatePageResponse): string {
        return task.id.replace(/-/g, ''); // конвертируем id в рабочий для ссылки
    }
};
