// QA-скрипт: проверка сохранения лидов в БД
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
console.log("Всего лидов в БД:", leads.length);
for (const l of leads) {
  console.log(
    `[${l.source}] ${l.name} / ${l.company} / ${l.phone} / ${l.product} / ${l.volume} / id=${l.id}`
  );
}
await db.$disconnect();
