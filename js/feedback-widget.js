// feedback-widget.js - Floating feedback button and modal
(function () {
  const PROJECT_NAME = 'PublicAPIFinder';
  const EMAIL = 'taeshinkim11@gmail.com';

  const feedbackTranslations = {
    EN: { title: 'Send Feedback', placeholder: 'Your message...', submit: 'Send', close: 'Close' },
    KO: { title: '피드백 보내기', placeholder: '메시지를 입력하세요...', submit: '보내기', close: '닫기' },
    JA: { title: 'フィードバックを送る', placeholder: 'メッセージを入力...', submit: '送信', close: '閉じる' },
    ZH: { title: '发送反馈', placeholder: '输入您的留言...', submit: '发送', close: '关闭' },
    ES: { title: 'Enviar Comentario', placeholder: 'Tu mensaje...', submit: 'Enviar', close: 'Cerrar' },
    FR: { title: 'Envoyer un Avis', placeholder: 'Votre message...', submit: 'Envoyer', close: 'Fermer' },
    DE: { title: 'Feedback Senden', placeholder: 'Ihre Nachricht...', submit: 'Senden', close: 'Schließen' },
    PT: { title: 'Enviar Feedback', placeholder: 'Sua mensagem...', submit: 'Enviar', close: 'Fechar' }
  };

  function getLang() {
    if (typeof currentLang !== 'undefined') return currentLang;
    return 'EN';
  }

  function tr(key) {
    const lang = getLang();
    return (feedbackTranslations[lang] && feedbackTranslations[lang][key]) ||
           feedbackTranslations['EN'][key] || key;
  }

  function createWidget() {
    const style = document.createElement('style');
    style.textContent = `
      #fb-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #5B6ABF;
        color: #fff;
        font-size: 22px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(91,106,191,0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      #fb-btn:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(91,106,191,0.55); }
      #fb-overlay {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0,0,0,0.35);
        align-items: flex-end;
        justify-content: flex-end;
        padding: 84px 24px 24px 0;
      }
      #fb-overlay.fb-open { display: flex; }
      #fb-modal {
        background: #fff;
        border-radius: 14px;
        padding: 20px;
        width: 300px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        position: relative;
      }
      #fb-modal h3 { margin: 0 0 12px; font-size: 15px; font-weight: 700; color: #2D2D2D; }
      #fb-textarea {
        width: 100%;
        min-height: 90px;
        border: 1px solid #E5E2DC;
        border-radius: 8px;
        padding: 10px;
        font-size: 13px;
        resize: vertical;
        box-sizing: border-box;
        font-family: inherit;
        color: #2D2D2D;
        outline: none;
      }
      #fb-textarea:focus { border-color: #5B6ABF; }
      #fb-actions { display: flex; gap: 8px; margin-top: 10px; justify-content: flex-end; }
      #fb-submit {
        background: #5B6ABF;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 7px 18px;
        font-size: 13px;
        cursor: pointer;
        font-weight: 600;
      }
      #fb-submit:hover { background: #4a58a8; }
      #fb-close-btn {
        background: #F8F6F2;
        color: #6B7280;
        border: none;
        border-radius: 8px;
        padding: 7px 14px;
        font-size: 13px;
        cursor: pointer;
        position: absolute;
        top: 12px;
        right: 12px;
        font-weight: 600;
        line-height: 1;
      }
      #fb-close-btn:hover { background: #E5E2DC; }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'fb-btn';
    btn.setAttribute('aria-label', 'Send Feedback');
    btn.innerHTML = '💬';
    document.body.appendChild(btn);

    const overlay = document.createElement('div');
    overlay.id = 'fb-overlay';
    overlay.innerHTML = `
      <div id="fb-modal">
        <button id="fb-close-btn" aria-label="Close">✕</button>
        <h3 id="fb-title">${tr('title')}</h3>
        <textarea id="fb-textarea" placeholder="${tr('placeholder')}"></textarea>
        <div id="fb-actions">
          <button id="fb-submit">${tr('submit')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    btn.addEventListener('click', openModal);
    document.getElementById('fb-close-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
    document.getElementById('fb-submit').addEventListener('click', submitFeedback);
  }

  function openModal() {
    updateWidgetLang();
    document.getElementById('fb-overlay').classList.add('fb-open');
    document.getElementById('fb-textarea').focus();
  }

  function closeModal() {
    document.getElementById('fb-overlay').classList.remove('fb-open');
    document.getElementById('fb-textarea').value = '';
  }

  function submitFeedback() {
    const msg = document.getElementById('fb-textarea').value.trim();
    const subject = encodeURIComponent('[' + PROJECT_NAME + '] Feedback');
    const body = encodeURIComponent(msg || '(no message)');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    closeModal();
  }

  function updateWidgetLang() {
    const title = document.getElementById('fb-title');
    const textarea = document.getElementById('fb-textarea');
    const submitBtn = document.getElementById('fb-submit');
    if (title) title.textContent = tr('title');
    if (textarea) textarea.placeholder = tr('placeholder');
    if (submitBtn) submitBtn.textContent = tr('submit');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
