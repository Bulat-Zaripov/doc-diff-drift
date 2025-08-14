// Пример документов для демонстрации
export const sampleDocuments = [
  {
    id: 'doc_1',
    name: 'doc_1.md',
    content: `# Техническое задание

![Логотип проекта](https://via.placeholder.com/400x200/0066cc/ffffff?text=Document+Management+System)

## Общее описание проекта

Разработка веб-приложения для управления документами компании.

### Основные функции:
- Создание документов
- Редактирование существующих документов
- Просмотр истории изменений

#### Дополнительные возможности:
- Экспорт в PDF
- Поиск по содержимому

## Технические требования

### Фронтенд
- **React** 18+
- **TypeScript** для типизации
- **Tailwind CSS** для стилизации

### Бэкенд
- Node.js
- Express
- MongoDB

## Статусы задач

| Задача | Статус | Исполнитель | Дедлайн |
|--------|--------|-------------|---------|
| Дизайн UI | ✅ Готово | Анна | 15.01.2024 |
| API разработка | 🔄 В процессе | Иван | 25.01.2024 |
| Тестирование | ⏳ Ожидает | Мария | 30.01.2024 |

## Временные рамки

Проект должен быть завершен в течение **2 месяцев**.

### Этапы:
1. **Планирование** (1 неделя)
   - Анализ требований
   - Создание mockups
2. **Разработка MVP** (4 недели)
   - Базовый функционал
   - Интеграция компонентов
3. **Тестирование** (2 недели)
   - Unit тесты
   - Integration тесты
4. **Деплой** (1 неделя)
   - Настройка CI/CD
   - Продакшн деплой

### Важные заметки

> **Внимание:** Все компоненты должны быть покрыты тестами на 80% минимум.

### Пример кода

\`\`\`typescript
interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}
\`\`\`

---

**Контакты команды:**
- Email: team@company.com
- Slack: #project-docs
`
  },
  {
    id: 'doc_2',
    name: 'doc_2.md',
    content: `# Техническое задание

![Логотип проекта обновленный](https://via.placeholder.com/400x200/0066cc/ffffff?text=Enhanced+Document+System)

## Общее описание проекта

Разработка веб-приложения для управления документами и контентом компании.

### Основные функции:
- ✨ Создание и импорт документов
- 📝 Редактирование существующих документов с версионированием
- 🔍 Просмотр истории изменений и сравнение версий
- 🔎 Поиск по документам
- 👥 Управление правами доступа

#### Новые возможности:
- 📊 Аналитика использования
- 🔔 Уведомления об изменениях
- 🏷️ Система тегов

## Технические требования

### Фронтенд
- **React** 18+
- **TypeScript** для строгой типизации
- **Tailwind CSS** для быстрой стилизации
- **React Query** для управления состоянием

### Бэкенд
- **Node.js** - runtime
- **Express** - веб фреймворк
- **PostgreSQL** (изменено с MongoDB)
- **Redis** для кэширования

### Архитектура системы

\`\`\`mermaid
graph TD
    A[Frontend React] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Document Service]
    D --> E[PostgreSQL]
    D --> F[Redis Cache]
\`\`\`

### Безопасность
- 🔐 JWT аутентификация
- 🛡️ RBAC система ролей
- 🔒 Шифрование чувствительных данных

## Сравнение технологий

| Компонент | Старая версия | Новая версия | Преимущества |
|-----------|---------------|--------------|--------------|
| База данных | MongoDB | PostgreSQL | ACID транзакции |
| Кэширование | - | Redis | Быстрый доступ |
| Аутентификация | Simple JWT | Enhanced JWT + RBAC | Безопасность |
| Состояние | useState | React Query | Синхронизация |

## Временные рамки

Проект должен быть завершен в течение **3 месяцев** (увеличено).

### Обновленные этапы:
1. **Планирование и дизайн** (2 недели)
   - [ ] Создание детального плана
   - [ ] UI/UX дизайн
   - [ ] Архитектура системы
2. **Разработка MVP** (6 недель)
   - [ ] Базовый CRUD
   - [ ] Аутентификация
   - [ ] Версионирование
3. **Дополнительные функции** (2 недели)
   - [ ] Поиск и фильтрация
   - [ ] Права доступа
4. **Тестирование** (3 недели)
   - [ ] Unit тесты (coverage > 80%)
   - [ ] Integration тесты
   - [ ] E2E тесты
5. **Деплой и оптимизация** (1 неделя)
   - [ ] Production deployment
   - [ ] Performance optimization

## Дополнительные требования

> **Важно:** Система должна поддерживать одновременную работу до 1000 пользователей.

### Производительность
- Время загрузки страницы < 2 сек
- Размер бандла < 500 KB
- Покрытие тестами > 80%

### Код компонента

\`\`\`typescript
interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  content: string;
  author: User;
  createdAt: Date;
  changes?: DiffResult[];
}

class DocumentService {
  async createVersion(doc: Document): Promise<DocumentVersion> {
    // Создание новой версии документа
    return await this.repository.save(doc);
  }
}
\`\`\`

---

**Обновленные контакты команды:**
- 📧 Email: team@company.com
- 💬 Slack: #enhanced-docs-project
- 📞 Phone: +7 (999) 123-45-67
`
  },
  {
    id: 'doc_3',
    name: 'doc_3.md',
    content: `# Техническое задание

![Финальная архитектура](https://via.placeholder.com/500x250/0066cc/ffffff?text=Enterprise+Document+Platform)

## Общее описание проекта

Разработка **комплексной системы управления документами** и контентом компании с интеграцией внешних сервисов.

### 🚀 Основные функции:
- 📄 Создание и импорт документов из различных источников
- ✏️ Редактирование существующих документов с полным версионированием
- 🔍 Просмотр истории изменений и сравнение версий
- 🔎 Расширенный поиск по документам с фильтрами
- 👨‍💼 Гибкое управление правами доступа
- 🔗 Интеграция с внешними системами (CRM, ERP)
- 🌐 API для сторонних приложений

#### 🎯 Расширенные возможности:
- 🤖 AI-ассистент для редактирования
- 📊 Продвинутая аналитика
- 🔄 Автоматическая синхронизация
- 📱 Мобильное приложение

## 🛠 Технические требования

### Frontend Stack
| Технология | Версия | Назначение |
|------------|--------|------------|
| **React** | 18+ | UI библиотека |
| **TypeScript** | 5.0+ | Типизация |
| **Tailwind CSS** | 3.0+ | Стилизация |
| **React Query** | 4.0+ | State management |
| **Zustand** | 4.0+ | Локальное состояние |

### Backend & Infrastructure

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    image: node:18-alpine
    ports:
      - "3000:3000"
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: documents
  cache:
    image: redis:7-alpine
  search:
    image: elasticsearch:8.0.0
\`\`\`

### 🏗 Архитектура микросервисов

\`\`\`mermaid
graph TB
    A[Load Balancer] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Document Service]
    B --> E[Search Service]
    B --> F[Notification Service]
    
    D --> G[PostgreSQL Primary]
    D --> H[PostgreSQL Replica]
    E --> I[Elasticsearch]
    F --> J[Redis Queue]
    
    K[File Storage] --> L[AWS S3]
    M[Monitoring] --> N[Grafana + Prometheus]
\`\`\`

### 🔐 Безопасность и соответствие

| Стандарт | Статус | Описание |
|----------|--------|----------|
| OAuth 2.0 / OIDC | ✅ Реализовано | Аутентификация |
| RBAC | ✅ Реализовано | Контроль доступа |
| GDPR | 🔄 В процессе | Защита данных |
| SOC 2 | ⏳ Планируется | Аудит безопасности |

### 📈 Метрики производительности

> **SLA требования:**
> - Uptime: 99.9%
> - Response time: < 200ms (95 percentile)
> - Throughput: 10,000 RPS

#### Нагрузочное тестирование

\`\`\`javascript
// k6 load test scenario
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 1000 },
    { duration: '2m', target: 0 },
  ],
};

export default function() {
  http.get('https://api.docs.company.com/documents');
}
\`\`\`

## ⏱ Временные рамки

Проект должен быть завершен в течение **4 месяцев**.

### 📋 Детальный план работ:

#### Phase 1: Foundation (3 недели)
- [x] Планирование и архитектура
- [x] Настройка инфраструктуры  
- [ ] CI/CD pipeline
- [ ] Monitoring setup

#### Phase 2: Core Development (8 недель)  
- [ ] **Week 1-2:** Authentication & Authorization
- [ ] **Week 3-4:** Document CRUD operations
- [ ] **Week 5-6:** Versioning & Diff system
- [ ] **Week 7-8:** Search & Advanced filtering

#### Phase 3: Integrations (3 недели)
- [ ] External APIs integration
- [ ] Webhook system
- [ ] Real-time notifications

#### Phase 4: Quality & Launch (3 недели)
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

## 🌟 Дополнительные требования

### UI/UX Features
- [ ] **Полностью адаптивный дизайн** для всех устройств
- [ ] **PWA поддержка** с offline capabilities
- [ ] **Темная тема** и настройки интерфейса
- [ ] **Горячие клавиши** для опытных пользователей

### Export & Import Formats

| Формат | Импорт | Экспорт | Приоритет |
|--------|--------|---------|-----------|
| PDF | ❌ | ✅ | Высокий |
| Word (.docx) | ✅ | ✅ | Высокий |
| Excel (.xlsx) | ✅ | ✅ | Средний |
| Markdown | ✅ | ✅ | Высокий |
| HTML | ✅ | ✅ | Средний |

### 🌍 Интернационализация

> **Поддерживаемые языки:** Русский, Английский, Немецкий, Французский

### 🔗 Интеграции

#### Обязательные
1. **Google Workspace** - импорт/экспорт документов
2. **Microsoft 365** - синхронизация с SharePoint
3. **Slack/Teams** - уведомления и боты

#### Дополнительные  
- Jira/Confluence интеграция
- GitLab/GitHub для технической документации
- Salesforce для CRM данных

### 📞 Контакты проектной команды

| Роль | Имя | Email | Телефон |
|------|-----|-------|---------|
| **Project Manager** | Алексей Иванов | alexey@company.com | +7 (999) 111-11-11 |
| **Tech Lead** | Мария Петрова | maria@company.com | +7 (999) 222-22-22 |
| **DevOps Engineer** | Дмитрий Сидоров | dmitry@company.com | +7 (999) 333-33-33 |

---

*Последнее обновление: $(date)*
*Версия документа: 3.0*
`
  }
];