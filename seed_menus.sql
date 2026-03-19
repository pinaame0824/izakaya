-- 既存のデータをクリア
TRUNCATE TABLE menus;

-- 炭火串焼き
INSERT INTO menus (name, price, category) VALUES
('大山どり もも', 320, 'yakitori'),
('極上 つくね（月見）', 450, 'yakitori'),
('ねぎま', 320, 'yakitori'),
('白レバー', 380, 'yakitori'),
('砂肝', 280, 'yakitori'),
('手羽先', 350, 'yakitori'),
('ハツ', 280, 'yakitori'),
('せせり', 320, 'yakitori'),
('ぼんじり', 300, 'yakitori'),
('ささみ（わさび・明太子）', 350, 'yakitori'),
('皮', 280, 'yakitori'),
('ヤゲン軟骨', 300, 'yakitori'),
('アスパラ巻き', 380, 'yakitori'),
('ミニトマト巻き', 350, 'yakitori'),
('しいたけ', 300, 'yakitori'),
('銀杏（季節限定）', 350, 'yakitori'),
('串焼き5種盛り合わせ', 1600, 'yakitori'),
('特選串10種盛り合わせ', 3000, 'yakitori');

-- 鮮魚
INSERT INTO menus (name, price, category) VALUES
('本日の刺身 三種盛り', 1600, 'sashimi'),
('特選 刺身 五種盛り', 2400, 'sashimi'),
('厳選 刺身 七種贅沢盛り', 3800, 'sashimi'),
('真鯛の薄造り', 1200, 'sashimi'),
('炙り〆鯖', 980, 'sashimi'),
('戻り鰹のたたき', 1100, 'sashimi'),
('本鮪の中トロ刺し', 1800, 'sashimi'),
('生うにの箱盛り', 3500, 'sashimi'),
('帆立貝柱の磯辺焼き', 850, 'sashimi'),
('カンパチのカルパッチョ', 1100, 'sashimi'),
('天然真鯛の中落ちポン酢', 780, 'sashimi'),
('大粒岩牡蠣（一個）', 900, 'sashimi'),
('鮮魚のなめろう', 850, 'sashimi'),
('アワビの踊り焼き', 2200, 'sashimi'),
('鮮魚のユッケ風', 950, 'sashimi');

-- 一品料理
INSERT INTO menus (name, price, category) VALUES
('自家製 燻製ポテトサラダ', 650, 'ippin'),
('出汁巻き玉子', 780, 'ippin'),
('明太チーズ出汁巻き', 950, 'ippin'),
('厚揚げの炭火炙り', 580, 'ippin'),
('牛すじの塩煮込み', 850, 'ippin'),
('黒毛和牛のタタキ', 1800, 'ippin'),
('旬野菜の天ぷら盛り', 1100, 'ippin'),
('蛍烏賊の沖漬け', 550, 'ippin'),
('エイヒレの炙り', 680, 'ippin'),
('チャンジャと韓国海苔', 500, 'ippin'),
('揚げ出し豆腐', 680, 'ippin'),
('若鶏の唐揚げ（秘伝のタレ）', 750, 'ippin'),
('自家製 豆腐の冷奴', 480, 'ippin'),
('梅軟骨の和え物', 520, 'ippin'),
('烏賊の一夜干し', 880, 'ippin'),
('茄子の煮浸し', 550, 'ippin'),
('漬物盛り合わせ', 650, 'ippin'),
('クリームチーズの味噌漬け', 620, 'ippin'),
('地鶏の塩昆布和え', 680, 'ippin'),
('山芋の竜田揚げ', 600, 'ippin'),
('大山どりの南蛮漬け', 820, 'ippin');

-- サラダ
INSERT INTO menus (name, price, category) VALUES
('篝火特製 季節の和サラダ', 880, 'salad'),
('豆腐と海藻のヘルシーサラダ', 780, 'salad'),
('蒸し鶏の胡麻ドレサラダ', 920, 'salad'),
('完熟トマトのスライス', 550, 'salad'),
('叩ききゅうりの塩昆布和え', 480, 'salad');

-- 〆の逸品
INSERT INTO menus (name, price, category) VALUES
('炭火焼きおにぎり', 320, 'rice_noodle'),
('鶏出汁の茶漬け（鮭・梅・鯛）', 650, 'rice_noodle'),
('本日の握り 三貫', 900, 'rice_noodle'),
('篝火特製 鶏塩ラーメン', 880, 'rice_noodle'),
('稲庭うどん（冷・温）', 750, 'rice_noodle'),
('石焼 親子丼', 1100, 'rice_noodle'),
('季節のシャーベット', 450, 'rice_noodle'),
('黒蜜きな粉アイス', 520, 'rice_noodle');

-- アルコール
INSERT INTO menus (name, price, category) VALUES
('生ビール（アサヒ 熟撰）', 700, 'alcohol'),
('瓶ビール（サッポロ ラガー赤星）', 750, 'alcohol'),
('瓶ビール（サントリー ザ・プレミアム・モルツ）', 800, 'alcohol'),
('ノンアルコールビール', 550, 'alcohol'),
('厳選日本酒（一合）', 850, 'alcohol'),
('十四代（限定入荷）', 1800, 'alcohol'),
('新政 NO.6', 1500, 'alcohol'),
('而今（純米吟醸）', 1200, 'alcohol'),
('八海山（特別本醸造）', 900, 'alcohol'),
('黒龍（いっちょらい）', 950, 'alcohol'),
('芋焼酎：佐藤 黒', 800, 'alcohol'),
('芋焼酎：魔王', 1200, 'alcohol'),
('麦焼酎：中々', 700, 'alcohol'),
('麦焼酎：兼八', 850, 'alcohol'),
('米焼酎：鳥飼', 900, 'alcohol'),
('濃厚レモンサワー', 600, 'alcohol'),
('すだちサワー', 650, 'alcohol'),
('紀州南高梅サワー', 650, 'alcohol'),
('宇治抹茶ハイ', 600, 'alcohol'),
('烏龍ハイ', 550, 'alcohol'),
('角ハイボール', 600, 'alcohol'),
('白州ハイボール', 1100, 'alcohol'),
('山崎ハイボール', 1100, 'alcohol'),
('響 ジャパニーズハーモニー', 1200, 'alcohol'),
('特製あらごし梅酒', 680, 'alcohol'),
('ゆず酒（ロック・ソーダ）', 680, 'alcohol'),
('グラスワイン（赤・白）', 800, 'alcohol');

-- ソフトドリンク
INSERT INTO menus (name, price, category) VALUES
('烏龍茶（冷・温）', 450, 'soft_drink'),
('黒烏龍茶', 550, 'soft_drink'),
('緑茶', 450, 'soft_drink'),
('ほうじ茶', 450, 'soft_drink'),
('コカ・コーラ', 500, 'soft_drink'),
('ジンジャーエール（辛口）', 500, 'soft_drink'),
('三ツ矢サイダー', 500, 'soft_drink'),
('オレンジジュース（100%）', 500, 'soft_drink'),
('グレープフルーツジュース', 500, 'soft_drink'),
('信州産 りんごジュース', 600, 'soft_drink'),
('山形産 佐藤錦 さくらんぼジュース', 700, 'soft_drink'),
('濃厚 マンゴージュース', 600, 'soft_drink'),
('完熟 桃ジュース', 600, 'soft_drink'),
('カルピス', 500, 'soft_drink'),
('炭酸水（レモン添え）', 400, 'soft_drink'),
('自家製ホットレモネード', 650, 'soft_drink');
