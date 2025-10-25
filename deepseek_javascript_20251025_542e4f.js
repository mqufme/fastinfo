class NewsAggregator {
    constructor() {
        this.newsContainer = document.getElementById('news-container');
        this.featuredNews = document.getElementById('featured-news');
        this.init();
    }

    init() {
        this.loadNews();
        this.setupEventListeners();
    }

    loadNews() {
        // Локальные данные вместо API запросов
        const mockNews = this.generateMockNews();
        this.renderNews(mockNews);
    }

    generateMockNews() {
        return [
            {
                id: 1,
                title: 'Важное событие в мире технологий',
                description: 'Краткое описание главной новости дня с важными деталями и интересными фактами о развитии современных технологий.',
                image: 'https://picsum.photos/600/400?random=1',
                source: 'РИА Новости',
                date: new Date().toLocaleDateString('ru-RU'),
                category: 'technology',
                url: '#'
            },
            {
                id: 2,
                title: 'Экономические реформы 2024',
                description: 'Правительство announces новые меры по стабилизации экономической ситуации в стране.',
                image: 'https://picsum.photos/600/400?random=2',
                source: 'ТАСС',
                date: new Date().toLocaleDateString('ru-RU'),
                category: 'economics',
                url: '#'
            },
            {
                id: 3,
                title: 'Спортивные достижения сборной',
                description: 'Наши атлеты показали выдающиеся результаты на международных соревнованиях.',
                image: 'https://picsum.photos/600/400?random=3',
                source: 'Спорт-Экспресс',
                date: new Date().toLocaleDateString('ru-RU'),
                category: 'sports',
                url: '#'
            }
        ];
    }

    renderNews(news) {
        this.newsContainer.innerHTML = '';
        
        news.forEach(item => {
            const newsCard = this.createNewsCard(item);
            this.newsContainer.appendChild(newsCard);
        });

        if (news.length > 0) {
            this.setFeaturedNews(news[0]);
        }
    }

    createNewsCard(newsItem) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${newsItem.image}" alt="${newsItem.title}" class="news-image">
            <div class="news-content">
                <span class="news-source">${newsItem.source}</span>
                <h3 class="news-title">${newsItem.title}</h3>
                <p class="news-description">${newsItem.description}</p>
                <div class="news-meta">
                    <span>${newsItem.date}</span>
                    <span>${newsItem.category}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            alert(`Открывается новость: ${newsItem.title}`);
        });

        return card;
    }

    setFeaturedNews(newsItem) {
        this.featuredNews.innerHTML = `
            <div class="featured-content">
                <span class="news-source">${newsItem.source}</span>
                <h1 class="featured-title">${newsItem.title}</h1>
                <p class="featured-description">${newsItem.description}</p>
                <div class="news-meta">
                    <span>${newsItem.date}</span>
                    <button class="read-more-btn" onclick="alert('Читать далее: ${newsItem.title}')">Читать далее</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Поиск по локальным данным
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('input', (e) => {
            this.filterNews(e.target.value);
        });

        // Фильтрация по категориям
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.getAttribute('href').substring(1);
                this.filterByCategory(category);
            });
        });
    }

    filterNews(query) {
        console.log('Поиск:', query);
        // Простая фильтрация по заголовку
        const cards = document.querySelectorAll('.news-card');
        cards.forEach(card => {
            const title = card.querySelector('.news-title').textContent.toLowerCase();
            const isVisible = title.includes(query.toLowerCase());
            card.style.display = isVisible ? 'block' : 'none';
        });
    }

    filterByCategory(category) {
        console.log('Фильтр по категории:', category);
        const cards = document.querySelectorAll('.news-card');
        cards.forEach(card => {
            const cardCategory = card.querySelector('.news-meta span:last-child').textContent;
            const isVisible = category === 'all' || cardCategory === category;
            card.style.display = isVisible ? 'block' : 'none';
        });
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new NewsAggregator();
});