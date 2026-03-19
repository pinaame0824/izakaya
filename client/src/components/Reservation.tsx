import { useState } from 'react';

const Reservation = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        people: 2,
        course: '席のみ予約',
        name: '',
        tel: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert('予約に失敗しました: ' + result.message);
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            alert('接続エラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <section className="reservation-page section bg-dark text-white text-center">
                <style>{`
                    .reservation-page { min-height: 80vh; display: flex; align-items: center; background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/assets/hero.png') center/cover fixed; }
                `}</style>
                <div className="container">
                    <h2 className="text-gold">予約を承りました</h2>
                    <p className="opacity-8" style={{ marginTop: '20px' }}>
                        ご登録いただいたメールアドレスへ確認メールをお送りしました。<br />
                        ご来店を心よりお待ちしております。
                    </p>
                    <button className="btn btn-outline mt-60" onClick={() => setSubmitted(false)}>戻る</button>
                </div>
            </section>
        );
    }

    return (
        <section className="reservation-page section bg-dark text-white text-center">
            <style>{`
                .reservation-page {
                    min-height: 100vh;
                    padding-top: 150px;
                    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/assets/hero.png') center/cover fixed;
                }
                .reservation-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .reservation-page h2 {
                    font-size: clamp(32px, 5vw, 48px);
                    margin-bottom: 20px;
                    font-family: var(--font-serif);
                }
                .res-intro {
                    margin-bottom: 40px;
                }
                .res-actions {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-top: 40px;
                    transition: var(--transition);
                }
                
                /* Form Styles */
                .reservation-form {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 60px 40px;
                    border-radius: 4px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    text-align: left;
                    margin-top: 50px;
                    animation: fadeIn 0.8s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .form-group {
                    margin-bottom: 25px;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    color: var(--primary-color);
                    letter-spacing: 0.1em;
                }
                input, select, textarea {
                    width: 100%;
                    padding: 12px 15px;
                    background: rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    border-radius: 2px;
                    font-family: var(--font-main);
                    transition: var(--transition);
                }
                input:focus, select:focus, textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    background: rgba(0, 0, 0, 0.7);
                }
                .submit-btn {
                    width: 100%;
                    margin-top: 20px;
                }
                .back-link {
                    display: block;
                    margin-top: 20px;
                    text-align: center;
                    font-size: 14px;
                    opacity: 0.7;
                    cursor: pointer;
                }
                .back-link:hover { opacity: 1; color: var(--primary-color); }

                @media (max-width: 768px) {
                    .res-actions { flex-direction: column; }
                    .form-row { grid-template-columns: 1fr; }
                    .reservation-form { padding: 30px 20px; }
                }
            `}</style>

            <div className="container reservation-container">
                {!isFormVisible ? (
                    <div className="res-intro">
                        <span className="sub-title text-gold">RESERVATION</span>
                        <h2>ご予約</h2>
                        <p className="opacity-8">お電話またはWebよりご予約を承っております。</p>
                        <div className="res-actions">
                            <a href="tel:00-0000-0000" className="btn btn-outline text-white">
                                <span style={{ display: 'block', fontSize: '12px', opacity: 0.7 }}>お電話で予約</span>
                                00-0000-0000
                            </a>
                            <button className="btn btn-gold" onClick={() => setIsFormVisible(true)}>
                                Webで予約する
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="reservation-form">
                        <h2 className="text-center" style={{ fontSize: '24px', marginBottom: '40px', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '20px' }}>予約情報を入力してください</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>ご来店日 *</label>
                                    <input type="date" name="date" required value={formData.date} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>ご来店時間 *</label>
                                    <input type="time" name="time" required value={formData.time} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>人数 *</label>
                                    <input type="number" name="people" min="1" max="20" required value={formData.people} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>コース</label>
                                    <select name="course" value={formData.course} onChange={handleInputChange}>
                                        <option value="席のみ予約">席のみ予約</option>
                                        <option value="【松】篝火特選コース">【松】篝火特選コース (¥8,000)</option>
                                        <option value="【竹】旬の味覚コース">【竹】旬の味覚コース (¥6,000)</option>
                                        <option value="【梅】定番おつまみコース">【梅】定番おつまみコース (¥4,500)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>お名前 *</label>
                                <input type="text" name="name" placeholder="姓名 太郎" required value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>電話番号 *</label>
                                    <input type="tel" name="tel" placeholder="090-0000-0000" required value={formData.tel} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>メールアドレス *</label>
                                    <input type="email" name="email" placeholder="example@mail.com" required value={formData.email} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>ご要望・アレルギー等</label>
                                <textarea name="message" rows={4} placeholder="アレルギーや記念日などのご要望がございましたらご記入ください" value={formData.message} onChange={handleInputChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-gold submit-btn" disabled={loading}>
                                {loading ? '送信中...' : '予約を確定する'}
                            </button>
                            <span className="back-link" onClick={() => setIsFormVisible(false)}>前の画面に戻る</span>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Reservation;
