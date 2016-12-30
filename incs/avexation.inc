<?php include_once "model/database.php";

$pdo = Database::connect();
	$id = $_REQUEST['id'];
           $sql =  "SELECT * FROM vexations WHERE id = {$id}";
           foreach ($pdo->query($sql) as $row) {
           $comments_count = "SELECT count(*) FROM comments WHERE vexationid = {$id}";
           foreach ($pdo->query($comments_count) as $row2) {
           		$comments_count = $row2["count(*)"];
           }
                    ?>
<div class="vexation">
	<div class="vexation-content">
		<?php echo $row['content']; ?><span class="username">— #<?php echo  $row['username']; ?></span>
	</div>
	<div class="vexation-footer">
		<a class="actionable" href="#novex"><span class="novex emotion">novex <?php echo $row['novexs']; ?></span></a>
		<a class="actionable" href="#cheya"><span class="cheya emotion">cheya <?php echo $row['cheyas']; ?></span></a>
		<a class="actionable" href="#abegi"><span class="abegi emotion">abegi <?php echo $row['abegis']; ?></span></a>
		<a class="actionable" href="#comment"><span class="comment emotion">comment <?php echo $comments_count; ?></span></a>
		<span class="inside">12.11.16 02:15pm</span>
	</div>
	<div class="comments">
		<?php
			$sql1 =  "SELECT * FROM comments WHERE vexationid = {$id}";

				if($comments_count == 0) {
					?>

					<div class="comments-card">No comments yet.</div>

					<?php
				}
	           foreach ($pdo->query($sql1) as $row1) {

	           	?>
					<div class="comments-card"><?php echo $row1['content']?></div>

	           	<?php
	           }
		?>
		<div class="comments-card">
			<textarea class="rant-box"></textarea>
			<a class="link primary">Submit</a>
		</div>
	</div>
</div>

                    <?php
           }
           Database::disconnect();
?>
