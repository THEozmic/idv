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
<div class="nav"><a class= "back" href="./#<?php echo $row['id']; ?>">← Back</a></div>
<div class="vexation">
	<div class="vexation-content">
		<?php echo $row['content']; ?><span class="username">— #<?php echo $row['id']; ?></span>
	</div>
	<div class="vexation-footer">
		<a data-tooltip="novex" class="actionable" href="#novex"><span class="novex emotion"><span class="icon novex"></span> <?php echo $row['novexs']; ?></span></a>
		<a data-tooltip="cheya" class="actionable" href="#cheya"><span class="cheya emotion"><span class="icon cheya"></span> <?php echo $row['cheyas']; ?></span></a>
		<a data-tooltip="abegi" class="actionable" href="#abegi"><span class="abegi emotion"><span class="icon abegi"></span> <?php echo $row['abegis']; ?></span></a>
		<a data-tooltip="comments" class="actionable" href="vexation-<?php echo $row['id']; ?>"><span class="comment emotion"><span class="icon comment"></span> <?php echo $comments_count; ?></span></a>
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
			<div class="comments-header">Post a comment</div>
				<textarea class="rant-box"></textarea>
				<a class="secondary post-comment">POST</a>
		</div>
	</div>
</div>

                    <?php
           }
           Database::disconnect();
?>
