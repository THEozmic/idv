<?php include_once "model/database.php";

$pdo = Database::connect();
           $sql = 'SELECT * FROM vexations ORDER BY id DESC';
           foreach ($pdo->query($sql) as $row) {
           	$id = $row['id'];
                   $comments_count = "SELECT count(*) FROM comments WHERE vexationid = {$id}";
           foreach ($pdo->query($comments_count) as $row2) {
           		$comments_count = $row2["count(*)"];
           }
                    ?>
<div class="vexation">
	<div class="vexation-content">
		<a href="vexation-<?php echo $row['id']; ?>"><?php echo $row['content']; ?><span class="username">— #<?php echo  $row['username']; ?></span></a>
	</div>
	<div class="vexation-footer">
		<a class="actionable" href="#novex"><span class="novex emotion">novex <?php echo $row['novexs']; ?></span></a>
		<a class="actionable" href="#cheya"><span class="cheya emotion">cheya <?php echo $row['cheyas']; ?></span></a>
		<a class="actionable" href="#abegi"><span class="abegi emotion">abegi <?php echo $row['abegis']; ?></span></a>
		<a class="actionable" href="#comment"><span class="comment emotion">comment <?php echo $comments_count; ?></span></a>
		<span class="inside">12.11.16 02:15pm</span>
	</div>
</div>

                    <?php
           }
           Database::disconnect();
?>